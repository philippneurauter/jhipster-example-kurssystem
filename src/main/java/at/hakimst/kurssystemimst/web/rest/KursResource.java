package at.hakimst.kurssystemimst.web.rest;
import at.hakimst.kurssystemimst.domain.Kurs;
import at.hakimst.kurssystemimst.service.KursService;
import at.hakimst.kurssystemimst.web.rest.errors.BadRequestAlertException;
import at.hakimst.kurssystemimst.web.rest.util.HeaderUtil;
import at.hakimst.kurssystemimst.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Kurs.
 */
@RestController
@RequestMapping("/api")
public class KursResource {

    private final Logger log = LoggerFactory.getLogger(KursResource.class);

    private static final String ENTITY_NAME = "kurs";

    private final KursService kursService;

    public KursResource(KursService kursService) {
        this.kursService = kursService;
    }

    /**
     * POST  /kurs : Create a new kurs.
     *
     * @param kurs the kurs to create
     * @return the ResponseEntity with status 201 (Created) and with body the new kurs, or with status 400 (Bad Request) if the kurs has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/kurs")
    public ResponseEntity<Kurs> createKurs(@Valid @RequestBody Kurs kurs) throws URISyntaxException {
        log.debug("REST request to save Kurs : {}", kurs);
        if (kurs.getId() != null) {
            throw new BadRequestAlertException("A new kurs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Kurs result = kursService.save(kurs);
        return ResponseEntity.created(new URI("/api/kurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /kurs : Updates an existing kurs.
     *
     * @param kurs the kurs to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated kurs,
     * or with status 400 (Bad Request) if the kurs is not valid,
     * or with status 500 (Internal Server Error) if the kurs couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/kurs")
    public ResponseEntity<Kurs> updateKurs(@Valid @RequestBody Kurs kurs) throws URISyntaxException {
        log.debug("REST request to update Kurs : {}", kurs);
        if (kurs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Kurs result = kursService.save(kurs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, kurs.getId().toString()))
            .body(result);
    }

    /**
     * GET  /kurs : get all the kurs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of kurs in body
     */
    @GetMapping("/kurs")
    public ResponseEntity<List<Kurs>> getAllKurs(Pageable pageable) {
        log.debug("REST request to get a page of Kurs");
        Page<Kurs> page = kursService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/kurs");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /kurs/:id : get the "id" kurs.
     *
     * @param id the id of the kurs to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the kurs, or with status 404 (Not Found)
     */
    @GetMapping("/kurs/{id}")
    public ResponseEntity<Kurs> getKurs(@PathVariable Long id) {
        log.debug("REST request to get Kurs : {}", id);
        Optional<Kurs> kurs = kursService.findOne(id);
        return ResponseUtil.wrapOrNotFound(kurs);
    }

    /**
     * DELETE  /kurs/:id : delete the "id" kurs.
     *
     * @param id the id of the kurs to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/kurs/{id}")
    public ResponseEntity<Void> deleteKurs(@PathVariable Long id) {
        log.debug("REST request to delete Kurs : {}", id);
        kursService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
