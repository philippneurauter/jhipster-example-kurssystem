package at.hakimst.kurssystemimst.web.rest;

import at.hakimst.kurssystemimst.KurssystemImstApp;

import at.hakimst.kurssystemimst.domain.Lehrer;
import at.hakimst.kurssystemimst.repository.LehrerRepository;
import at.hakimst.kurssystemimst.service.LehrerService;
import at.hakimst.kurssystemimst.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static at.hakimst.kurssystemimst.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LehrerResource REST controller.
 *
 * @see LehrerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KurssystemImstApp.class)
public class LehrerResourceIntTest {

    private static final String DEFAULT_LEHRERNAME = "AAAAAAAAAA";
    private static final String UPDATED_LEHRERNAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_GEBURTSDATUM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_GEBURTSDATUM = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_FAECHER = "AAAAAAAAAA";
    private static final String UPDATED_FAECHER = "BBBBBBBBBB";

    private static final String DEFAULT_VORSTAND = "AAAAAAAAAA";
    private static final String UPDATED_VORSTAND = "BBBBBBBBBB";

    @Autowired
    private LehrerRepository lehrerRepository;

    @Autowired
    private LehrerService lehrerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restLehrerMockMvc;

    private Lehrer lehrer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LehrerResource lehrerResource = new LehrerResource(lehrerService);
        this.restLehrerMockMvc = MockMvcBuilders.standaloneSetup(lehrerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Lehrer createEntity(EntityManager em) {
        Lehrer lehrer = new Lehrer()
            .lehrername(DEFAULT_LEHRERNAME)
            .geburtsdatum(DEFAULT_GEBURTSDATUM)
            .faecher(DEFAULT_FAECHER)
            .vorstand(DEFAULT_VORSTAND);
        return lehrer;
    }

    @Before
    public void initTest() {
        lehrer = createEntity(em);
    }

    @Test
    @Transactional
    public void createLehrer() throws Exception {
        int databaseSizeBeforeCreate = lehrerRepository.findAll().size();

        // Create the Lehrer
        restLehrerMockMvc.perform(post("/api/lehrers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lehrer)))
            .andExpect(status().isCreated());

        // Validate the Lehrer in the database
        List<Lehrer> lehrerList = lehrerRepository.findAll();
        assertThat(lehrerList).hasSize(databaseSizeBeforeCreate + 1);
        Lehrer testLehrer = lehrerList.get(lehrerList.size() - 1);
        assertThat(testLehrer.getLehrername()).isEqualTo(DEFAULT_LEHRERNAME);
        assertThat(testLehrer.getGeburtsdatum()).isEqualTo(DEFAULT_GEBURTSDATUM);
        assertThat(testLehrer.getFaecher()).isEqualTo(DEFAULT_FAECHER);
        assertThat(testLehrer.getVorstand()).isEqualTo(DEFAULT_VORSTAND);
    }

    @Test
    @Transactional
    public void createLehrerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lehrerRepository.findAll().size();

        // Create the Lehrer with an existing ID
        lehrer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLehrerMockMvc.perform(post("/api/lehrers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lehrer)))
            .andExpect(status().isBadRequest());

        // Validate the Lehrer in the database
        List<Lehrer> lehrerList = lehrerRepository.findAll();
        assertThat(lehrerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLehrernameIsRequired() throws Exception {
        int databaseSizeBeforeTest = lehrerRepository.findAll().size();
        // set the field null
        lehrer.setLehrername(null);

        // Create the Lehrer, which fails.

        restLehrerMockMvc.perform(post("/api/lehrers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lehrer)))
            .andExpect(status().isBadRequest());

        List<Lehrer> lehrerList = lehrerRepository.findAll();
        assertThat(lehrerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLehrers() throws Exception {
        // Initialize the database
        lehrerRepository.saveAndFlush(lehrer);

        // Get all the lehrerList
        restLehrerMockMvc.perform(get("/api/lehrers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lehrer.getId().intValue())))
            .andExpect(jsonPath("$.[*].lehrername").value(hasItem(DEFAULT_LEHRERNAME.toString())))
            .andExpect(jsonPath("$.[*].geburtsdatum").value(hasItem(DEFAULT_GEBURTSDATUM.toString())))
            .andExpect(jsonPath("$.[*].faecher").value(hasItem(DEFAULT_FAECHER.toString())))
            .andExpect(jsonPath("$.[*].vorstand").value(hasItem(DEFAULT_VORSTAND.toString())));
    }
    
    @Test
    @Transactional
    public void getLehrer() throws Exception {
        // Initialize the database
        lehrerRepository.saveAndFlush(lehrer);

        // Get the lehrer
        restLehrerMockMvc.perform(get("/api/lehrers/{id}", lehrer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lehrer.getId().intValue()))
            .andExpect(jsonPath("$.lehrername").value(DEFAULT_LEHRERNAME.toString()))
            .andExpect(jsonPath("$.geburtsdatum").value(DEFAULT_GEBURTSDATUM.toString()))
            .andExpect(jsonPath("$.faecher").value(DEFAULT_FAECHER.toString()))
            .andExpect(jsonPath("$.vorstand").value(DEFAULT_VORSTAND.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLehrer() throws Exception {
        // Get the lehrer
        restLehrerMockMvc.perform(get("/api/lehrers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLehrer() throws Exception {
        // Initialize the database
        lehrerService.save(lehrer);

        int databaseSizeBeforeUpdate = lehrerRepository.findAll().size();

        // Update the lehrer
        Lehrer updatedLehrer = lehrerRepository.findById(lehrer.getId()).get();
        // Disconnect from session so that the updates on updatedLehrer are not directly saved in db
        em.detach(updatedLehrer);
        updatedLehrer
            .lehrername(UPDATED_LEHRERNAME)
            .geburtsdatum(UPDATED_GEBURTSDATUM)
            .faecher(UPDATED_FAECHER)
            .vorstand(UPDATED_VORSTAND);

        restLehrerMockMvc.perform(put("/api/lehrers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLehrer)))
            .andExpect(status().isOk());

        // Validate the Lehrer in the database
        List<Lehrer> lehrerList = lehrerRepository.findAll();
        assertThat(lehrerList).hasSize(databaseSizeBeforeUpdate);
        Lehrer testLehrer = lehrerList.get(lehrerList.size() - 1);
        assertThat(testLehrer.getLehrername()).isEqualTo(UPDATED_LEHRERNAME);
        assertThat(testLehrer.getGeburtsdatum()).isEqualTo(UPDATED_GEBURTSDATUM);
        assertThat(testLehrer.getFaecher()).isEqualTo(UPDATED_FAECHER);
        assertThat(testLehrer.getVorstand()).isEqualTo(UPDATED_VORSTAND);
    }

    @Test
    @Transactional
    public void updateNonExistingLehrer() throws Exception {
        int databaseSizeBeforeUpdate = lehrerRepository.findAll().size();

        // Create the Lehrer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLehrerMockMvc.perform(put("/api/lehrers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lehrer)))
            .andExpect(status().isBadRequest());

        // Validate the Lehrer in the database
        List<Lehrer> lehrerList = lehrerRepository.findAll();
        assertThat(lehrerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLehrer() throws Exception {
        // Initialize the database
        lehrerService.save(lehrer);

        int databaseSizeBeforeDelete = lehrerRepository.findAll().size();

        // Delete the lehrer
        restLehrerMockMvc.perform(delete("/api/lehrers/{id}", lehrer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Lehrer> lehrerList = lehrerRepository.findAll();
        assertThat(lehrerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lehrer.class);
        Lehrer lehrer1 = new Lehrer();
        lehrer1.setId(1L);
        Lehrer lehrer2 = new Lehrer();
        lehrer2.setId(lehrer1.getId());
        assertThat(lehrer1).isEqualTo(lehrer2);
        lehrer2.setId(2L);
        assertThat(lehrer1).isNotEqualTo(lehrer2);
        lehrer1.setId(null);
        assertThat(lehrer1).isNotEqualTo(lehrer2);
    }
}
