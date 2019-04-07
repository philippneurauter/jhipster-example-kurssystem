package at.hakimst.kurssystemimst.web.rest;
import at.hakimst.kurssystemimst.domain.Schueler;
import at.hakimst.kurssystemimst.service.SchuelerService;
import at.hakimst.kurssystemimst.web.rest.errors.BadRequestAlertException;
import at.hakimst.kurssystemimst.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Schueler.
 */
@RestController
@RequestMapping("/api")
public class SchuelerResource {

    private final Logger log = LoggerFactory.getLogger(SchuelerResource.class);

    private static final String ENTITY_NAME = "schueler";

    private final SchuelerService schuelerService;

    public SchuelerResource(SchuelerService schuelerService) {
        this.schuelerService = schuelerService;
    }

    /**
     * POST  /schuelers : Create a new schueler.
     *
     * @param schueler the schueler to create
     * @return the ResponseEntity with status 201 (Created) and with body the new schueler, or with status 400 (Bad Request) if the schueler has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/schuelers")
    public ResponseEntity<Schueler> createSchueler(@Valid @RequestBody Schueler schueler) throws URISyntaxException {
        log.debug("REST request to save Schueler : {}", schueler);
        if (schueler.getId() != null) {
            throw new BadRequestAlertException("A new schueler cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Schueler result = schuelerService.save(schueler);
        return ResponseEntity.created(new URI("/api/schuelers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /schuelers : Updates an existing schueler.
     *
     * @param schueler the schueler to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated schueler,
     * or with status 400 (Bad Request) if the schueler is not valid,
     * or with status 500 (Internal Server Error) if the schueler couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/schuelers")
    public ResponseEntity<Schueler> updateSchueler(@Valid @RequestBody Schueler schueler) throws URISyntaxException {
        log.debug("REST request to update Schueler : {}", schueler);
        if (schueler.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Schueler result = schuelerService.save(schueler);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, schueler.getId().toString()))
            .body(result);
    }

    /**
     * GET  /schuelers : get all the schuelers.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of schuelers in body
     */
    @GetMapping("/schuelers")
    public List<Schueler> getAllSchuelers(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Schuelers");
        return schuelerService.findAll();
    }

    /**
     * GET  /schuelers/:id : get the "id" schueler.
     *
     * @param id the id of the schueler to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the schueler, or with status 404 (Not Found)
     */
    @GetMapping("/schuelers/{id}")
    public ResponseEntity<Schueler> getSchueler(@PathVariable Long id) {
        log.debug("REST request to get Schueler : {}", id);
        Optional<Schueler> schueler = schuelerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(schueler);
    }

    /**
     * DELETE  /schuelers/:id : delete the "id" schueler.
     *
     * @param id the id of the schueler to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/schuelers/{id}")
    public ResponseEntity<Void> deleteSchueler(@PathVariable Long id) {
        log.debug("REST request to delete Schueler : {}", id);
        schuelerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
