package at.hakimst.kurssystemimst.web.rest;

import at.hakimst.kurssystemimst.KurssystemImstApp;

import at.hakimst.kurssystemimst.domain.Schueler;
import at.hakimst.kurssystemimst.repository.SchuelerRepository;
import at.hakimst.kurssystemimst.service.SchuelerService;
import at.hakimst.kurssystemimst.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import java.util.ArrayList;
import java.util.List;


import static at.hakimst.kurssystemimst.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SchuelerResource REST controller.
 *
 * @see SchuelerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KurssystemImstApp.class)
public class SchuelerResourceIntTest {

    private static final String DEFAULT_SCHUELERNAME = "AAAAAAAAAA";
    private static final String UPDATED_SCHUELERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_KLASSE = "AAAAAAAAAA";
    private static final String UPDATED_KLASSE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_GEBURTSDATUM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_GEBURTSDATUM = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SchuelerRepository schuelerRepository;

    @Mock
    private SchuelerRepository schuelerRepositoryMock;

    @Mock
    private SchuelerService schuelerServiceMock;

    @Autowired
    private SchuelerService schuelerService;

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

    private MockMvc restSchuelerMockMvc;

    private Schueler schueler;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SchuelerResource schuelerResource = new SchuelerResource(schuelerService);
        this.restSchuelerMockMvc = MockMvcBuilders.standaloneSetup(schuelerResource)
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
    public static Schueler createEntity(EntityManager em) {
        Schueler schueler = new Schueler()
            .schuelername(DEFAULT_SCHUELERNAME)
            .klasse(DEFAULT_KLASSE)
            .geburtsdatum(DEFAULT_GEBURTSDATUM);
        return schueler;
    }

    @Before
    public void initTest() {
        schueler = createEntity(em);
    }

    @Test
    @Transactional
    public void createSchueler() throws Exception {
        int databaseSizeBeforeCreate = schuelerRepository.findAll().size();

        // Create the Schueler
        restSchuelerMockMvc.perform(post("/api/schuelers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schueler)))
            .andExpect(status().isCreated());

        // Validate the Schueler in the database
        List<Schueler> schuelerList = schuelerRepository.findAll();
        assertThat(schuelerList).hasSize(databaseSizeBeforeCreate + 1);
        Schueler testSchueler = schuelerList.get(schuelerList.size() - 1);
        assertThat(testSchueler.getSchuelername()).isEqualTo(DEFAULT_SCHUELERNAME);
        assertThat(testSchueler.getKlasse()).isEqualTo(DEFAULT_KLASSE);
        assertThat(testSchueler.getGeburtsdatum()).isEqualTo(DEFAULT_GEBURTSDATUM);
    }

    @Test
    @Transactional
    public void createSchuelerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = schuelerRepository.findAll().size();

        // Create the Schueler with an existing ID
        schueler.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSchuelerMockMvc.perform(post("/api/schuelers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schueler)))
            .andExpect(status().isBadRequest());

        // Validate the Schueler in the database
        List<Schueler> schuelerList = schuelerRepository.findAll();
        assertThat(schuelerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSchuelernameIsRequired() throws Exception {
        int databaseSizeBeforeTest = schuelerRepository.findAll().size();
        // set the field null
        schueler.setSchuelername(null);

        // Create the Schueler, which fails.

        restSchuelerMockMvc.perform(post("/api/schuelers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schueler)))
            .andExpect(status().isBadRequest());

        List<Schueler> schuelerList = schuelerRepository.findAll();
        assertThat(schuelerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSchuelers() throws Exception {
        // Initialize the database
        schuelerRepository.saveAndFlush(schueler);

        // Get all the schuelerList
        restSchuelerMockMvc.perform(get("/api/schuelers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(schueler.getId().intValue())))
            .andExpect(jsonPath("$.[*].schuelername").value(hasItem(DEFAULT_SCHUELERNAME.toString())))
            .andExpect(jsonPath("$.[*].klasse").value(hasItem(DEFAULT_KLASSE.toString())))
            .andExpect(jsonPath("$.[*].geburtsdatum").value(hasItem(DEFAULT_GEBURTSDATUM.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllSchuelersWithEagerRelationshipsIsEnabled() throws Exception {
        SchuelerResource schuelerResource = new SchuelerResource(schuelerServiceMock);
        when(schuelerServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restSchuelerMockMvc = MockMvcBuilders.standaloneSetup(schuelerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restSchuelerMockMvc.perform(get("/api/schuelers?eagerload=true"))
        .andExpect(status().isOk());

        verify(schuelerServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllSchuelersWithEagerRelationshipsIsNotEnabled() throws Exception {
        SchuelerResource schuelerResource = new SchuelerResource(schuelerServiceMock);
            when(schuelerServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restSchuelerMockMvc = MockMvcBuilders.standaloneSetup(schuelerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restSchuelerMockMvc.perform(get("/api/schuelers?eagerload=true"))
        .andExpect(status().isOk());

            verify(schuelerServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getSchueler() throws Exception {
        // Initialize the database
        schuelerRepository.saveAndFlush(schueler);

        // Get the schueler
        restSchuelerMockMvc.perform(get("/api/schuelers/{id}", schueler.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(schueler.getId().intValue()))
            .andExpect(jsonPath("$.schuelername").value(DEFAULT_SCHUELERNAME.toString()))
            .andExpect(jsonPath("$.klasse").value(DEFAULT_KLASSE.toString()))
            .andExpect(jsonPath("$.geburtsdatum").value(DEFAULT_GEBURTSDATUM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSchueler() throws Exception {
        // Get the schueler
        restSchuelerMockMvc.perform(get("/api/schuelers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSchueler() throws Exception {
        // Initialize the database
        schuelerService.save(schueler);

        int databaseSizeBeforeUpdate = schuelerRepository.findAll().size();

        // Update the schueler
        Schueler updatedSchueler = schuelerRepository.findById(schueler.getId()).get();
        // Disconnect from session so that the updates on updatedSchueler are not directly saved in db
        em.detach(updatedSchueler);
        updatedSchueler
            .schuelername(UPDATED_SCHUELERNAME)
            .klasse(UPDATED_KLASSE)
            .geburtsdatum(UPDATED_GEBURTSDATUM);

        restSchuelerMockMvc.perform(put("/api/schuelers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSchueler)))
            .andExpect(status().isOk());

        // Validate the Schueler in the database
        List<Schueler> schuelerList = schuelerRepository.findAll();
        assertThat(schuelerList).hasSize(databaseSizeBeforeUpdate);
        Schueler testSchueler = schuelerList.get(schuelerList.size() - 1);
        assertThat(testSchueler.getSchuelername()).isEqualTo(UPDATED_SCHUELERNAME);
        assertThat(testSchueler.getKlasse()).isEqualTo(UPDATED_KLASSE);
        assertThat(testSchueler.getGeburtsdatum()).isEqualTo(UPDATED_GEBURTSDATUM);
    }

    @Test
    @Transactional
    public void updateNonExistingSchueler() throws Exception {
        int databaseSizeBeforeUpdate = schuelerRepository.findAll().size();

        // Create the Schueler

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSchuelerMockMvc.perform(put("/api/schuelers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schueler)))
            .andExpect(status().isBadRequest());

        // Validate the Schueler in the database
        List<Schueler> schuelerList = schuelerRepository.findAll();
        assertThat(schuelerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSchueler() throws Exception {
        // Initialize the database
        schuelerService.save(schueler);

        int databaseSizeBeforeDelete = schuelerRepository.findAll().size();

        // Delete the schueler
        restSchuelerMockMvc.perform(delete("/api/schuelers/{id}", schueler.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Schueler> schuelerList = schuelerRepository.findAll();
        assertThat(schuelerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Schueler.class);
        Schueler schueler1 = new Schueler();
        schueler1.setId(1L);
        Schueler schueler2 = new Schueler();
        schueler2.setId(schueler1.getId());
        assertThat(schueler1).isEqualTo(schueler2);
        schueler2.setId(2L);
        assertThat(schueler1).isNotEqualTo(schueler2);
        schueler1.setId(null);
        assertThat(schueler1).isNotEqualTo(schueler2);
    }
}
