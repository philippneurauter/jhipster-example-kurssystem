package at.hakimst.kurssystemimst.service;

import at.hakimst.kurssystemimst.domain.Schueler;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Schueler.
 */
public interface SchuelerService {

    /**
     * Save a schueler.
     *
     * @param schueler the entity to save
     * @return the persisted entity
     */
    Schueler save(Schueler schueler);

    /**
     * Get all the schuelers.
     *
     * @return the list of entities
     */
    List<Schueler> findAll();

    /**
     * Get all the Schueler with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<Schueler> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" schueler.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Schueler> findOne(Long id);

    /**
     * Delete the "id" schueler.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
