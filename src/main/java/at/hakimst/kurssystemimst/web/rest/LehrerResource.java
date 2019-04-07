package at.hakimst.kurssystemimst.web.rest;
import at.hakimst.kurssystemimst.domain.Lehrer;
import at.hakimst.kurssystemimst.service.LehrerService;
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
 * REST controller for managing Lehrer.
 */
@RestController
@RequestMapping("/api")
public class LehrerResource {

    private final Logger log = LoggerFactory.getLogger(LehrerResource.class);

    private static final String ENTITY_NAME = "lehrer";

    private final LehrerService lehrerService;

    public LehrerResource(LehrerService lehrerService) {
        this.lehrerService = lehrerService;
    }

    /**
     * POST  /lehrers : Create a new lehrer.
     *
     * @param lehrer the lehrer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lehrer, or with status 400 (Bad Request) if the lehrer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lehrers")
    public ResponseEntity<Lehrer> createLehrer(@Valid @RequestBody Lehrer lehrer) throws URISyntaxException {
        log.debug("REST request to save Lehrer : {}", lehrer);
        if (lehrer.getId() != null) {
            throw new BadRequestAlertException("A new lehrer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lehrer result = lehrerService.save(lehrer);
        return ResponseEntity.created(new URI("/api/lehrers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lehrers : Updates an existing lehrer.
     *
     * @param lehrer the lehrer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lehrer,
     * or with status 400 (Bad Request) if the lehrer is not valid,
     * or with status 500 (Internal Server Error) if the lehrer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lehrers")
    public ResponseEntity<Lehrer> updateLehrer(@Valid @RequestBody Lehrer lehrer) throws URISyntaxException {
        log.debug("REST request to update Lehrer : {}", lehrer);
        if (lehrer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Lehrer result = lehrerService.save(lehrer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lehrer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lehrers : get all the lehrers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of lehrers in body
     */
    @GetMapping("/lehrers")
    public List<Lehrer> getAllLehrers() {
        log.debug("REST request to get all Lehrers");
        return lehrerService.findAll();
    }

    /**
     * GET  /lehrers/:id : get the "id" lehrer.
     *
     * @param id the id of the lehrer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lehrer, or with status 404 (Not Found)
     */
    @GetMapping("/lehrers/{id}")
    public ResponseEntity<Lehrer> getLehrer(@PathVariable Long id) {
        log.debug("REST request to get Lehrer : {}", id);
        Optional<Lehrer> lehrer = lehrerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(lehrer);
    }

    /**
     * DELETE  /lehrers/:id : delete the "id" lehrer.
     *
     * @param id the id of the lehrer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lehrers/{id}")
    public ResponseEntity<Void> deleteLehrer(@PathVariable Long id) {
        log.debug("REST request to delete Lehrer : {}", id);
        lehrerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
