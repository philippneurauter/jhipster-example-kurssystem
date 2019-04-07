package at.hakimst.kurssystemimst.web.rest;

import at.hakimst.kurssystemimst.KurssystemImstApp;

import at.hakimst.kurssystemimst.domain.Kurs;
import at.hakimst.kurssystemimst.repository.KursRepository;
import at.hakimst.kurssystemimst.service.KursService;
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
import java.util.List;


import static at.hakimst.kurssystemimst.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the KursResource REST controller.
 *
 * @see KursResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KurssystemImstApp.class)
public class KursResourceIntTest {

    private static final String DEFAULT_KURSNAME = "AAAAAAAAAA";
    private static final String UPDATED_KURSNAME = "BBBBBBBBBB";

    private static final String DEFAULT_KURSART = "AAAAAAAAAA";
    private static final String UPDATED_KURSART = "BBBBBBBBBB";

    private static final Double DEFAULT_KURSEINHEIT = 1D;
    private static final Double UPDATED_KURSEINHEIT = 2D;

    private static final String DEFAULT_KURSKAPAZITAET = "AAAAAAAAAA";
    private static final String UPDATED_KURSKAPAZITAET = "BBBBBBBBBB";

    @Autowired
    private KursRepository kursRepository;

    @Autowired
    private KursService kursService;

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

    private MockMvc restKursMockMvc;

    private Kurs kurs;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KursResource kursResource = new KursResource(kursService);
        this.restKursMockMvc = MockMvcBuilders.standaloneSetup(kursResource)
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
    public static Kurs createEntity(EntityManager em) {
        Kurs kurs = new Kurs()
            .kursname(DEFAULT_KURSNAME)
            .kursart(DEFAULT_KURSART)
            .kurseinheit(DEFAULT_KURSEINHEIT)
            .kurskapazitaet(DEFAULT_KURSKAPAZITAET);
        return kurs;
    }

    @Before
    public void initTest() {
        kurs = createEntity(em);
    }

    @Test
    @Transactional
    public void createKurs() throws Exception {
        int databaseSizeBeforeCreate = kursRepository.findAll().size();

        // Create the Kurs
        restKursMockMvc.perform(post("/api/kurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kurs)))
            .andExpect(status().isCreated());

        // Validate the Kurs in the database
        List<Kurs> kursList = kursRepository.findAll();
        assertThat(kursList).hasSize(databaseSizeBeforeCreate + 1);
        Kurs testKurs = kursList.get(kursList.size() - 1);
        assertThat(testKurs.getKursname()).isEqualTo(DEFAULT_KURSNAME);
        assertThat(testKurs.getKursart()).isEqualTo(DEFAULT_KURSART);
        assertThat(testKurs.getKurseinheit()).isEqualTo(DEFAULT_KURSEINHEIT);
        assertThat(testKurs.getKurskapazitaet()).isEqualTo(DEFAULT_KURSKAPAZITAET);
    }

    @Test
    @Transactional
    public void createKursWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = kursRepository.findAll().size();

        // Create the Kurs with an existing ID
        kurs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKursMockMvc.perform(post("/api/kurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kurs)))
            .andExpect(status().isBadRequest());

        // Validate the Kurs in the database
        List<Kurs> kursList = kursRepository.findAll();
        assertThat(kursList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkKursnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = kursRepository.findAll().size();
        // set the field null
        kurs.setKursname(null);

        // Create the Kurs, which fails.

        restKursMockMvc.perform(post("/api/kurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kurs)))
            .andExpect(status().isBadRequest());

        List<Kurs> kursList = kursRepository.findAll();
        assertThat(kursList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkKursartIsRequired() throws Exception {
        int databaseSizeBeforeTest = kursRepository.findAll().size();
        // set the field null
        kurs.setKursart(null);

        // Create the Kurs, which fails.

        restKursMockMvc.perform(post("/api/kurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kurs)))
            .andExpect(status().isBadRequest());

        List<Kurs> kursList = kursRepository.findAll();
        assertThat(kursList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllKurs() throws Exception {
        // Initialize the database
        kursRepository.saveAndFlush(kurs);

        // Get all the kursList
        restKursMockMvc.perform(get("/api/kurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(kurs.getId().intValue())))
            .andExpect(jsonPath("$.[*].kursname").value(hasItem(DEFAULT_KURSNAME.toString())))
            .andExpect(jsonPath("$.[*].kursart").value(hasItem(DEFAULT_KURSART.toString())))
            .andExpect(jsonPath("$.[*].kurseinheit").value(hasItem(DEFAULT_KURSEINHEIT.doubleValue())))
            .andExpect(jsonPath("$.[*].kurskapazitaet").value(hasItem(DEFAULT_KURSKAPAZITAET.toString())));
    }
    
    @Test
    @Transactional
    public void getKurs() throws Exception {
        // Initialize the database
        kursRepository.saveAndFlush(kurs);

        // Get the kurs
        restKursMockMvc.perform(get("/api/kurs/{id}", kurs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(kurs.getId().intValue()))
            .andExpect(jsonPath("$.kursname").value(DEFAULT_KURSNAME.toString()))
            .andExpect(jsonPath("$.kursart").value(DEFAULT_KURSART.toString()))
            .andExpect(jsonPath("$.kurseinheit").value(DEFAULT_KURSEINHEIT.doubleValue()))
            .andExpect(jsonPath("$.kurskapazitaet").value(DEFAULT_KURSKAPAZITAET.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingKurs() throws Exception {
        // Get the kurs
        restKursMockMvc.perform(get("/api/kurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKurs() throws Exception {
        // Initialize the database
        kursService.save(kurs);

        int databaseSizeBeforeUpdate = kursRepository.findAll().size();

        // Update the kurs
        Kurs updatedKurs = kursRepository.findById(kurs.getId()).get();
        // Disconnect from session so that the updates on updatedKurs are not directly saved in db
        em.detach(updatedKurs);
        updatedKurs
            .kursname(UPDATED_KURSNAME)
            .kursart(UPDATED_KURSART)
            .kurseinheit(UPDATED_KURSEINHEIT)
            .kurskapazitaet(UPDATED_KURSKAPAZITAET);

        restKursMockMvc.perform(put("/api/kurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKurs)))
            .andExpect(status().isOk());

        // Validate the Kurs in the database
        List<Kurs> kursList = kursRepository.findAll();
        assertThat(kursList).hasSize(databaseSizeBeforeUpdate);
        Kurs testKurs = kursList.get(kursList.size() - 1);
        assertThat(testKurs.getKursname()).isEqualTo(UPDATED_KURSNAME);
        assertThat(testKurs.getKursart()).isEqualTo(UPDATED_KURSART);
        assertThat(testKurs.getKurseinheit()).isEqualTo(UPDATED_KURSEINHEIT);
        assertThat(testKurs.getKurskapazitaet()).isEqualTo(UPDATED_KURSKAPAZITAET);
    }

    @Test
    @Transactional
    public void updateNonExistingKurs() throws Exception {
        int databaseSizeBeforeUpdate = kursRepository.findAll().size();

        // Create the Kurs

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKursMockMvc.perform(put("/api/kurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(kurs)))
            .andExpect(status().isBadRequest());

        // Validate the Kurs in the database
        List<Kurs> kursList = kursRepository.findAll();
        assertThat(kursList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteKurs() throws Exception {
        // Initialize the database
        kursService.save(kurs);

        int databaseSizeBeforeDelete = kursRepository.findAll().size();

        // Delete the kurs
        restKursMockMvc.perform(delete("/api/kurs/{id}", kurs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Kurs> kursList = kursRepository.findAll();
        assertThat(kursList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Kurs.class);
        Kurs kurs1 = new Kurs();
        kurs1.setId(1L);
        Kurs kurs2 = new Kurs();
        kurs2.setId(kurs1.getId());
        assertThat(kurs1).isEqualTo(kurs2);
        kurs2.setId(2L);
        assertThat(kurs1).isNotEqualTo(kurs2);
        kurs1.setId(null);
        assertThat(kurs1).isNotEqualTo(kurs2);
    }
}
