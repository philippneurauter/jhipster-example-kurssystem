package at.hakimst.kurssystemimst.service;

import at.hakimst.kurssystemimst.domain.Lehrer;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Lehrer.
 */
public interface LehrerService {

    /**
     * Save a lehrer.
     *
     * @param lehrer the entity to save
     * @return the persisted entity
     */
    Lehrer save(Lehrer lehrer);

    /**
     * Get all the lehrers.
     *
     * @return the list of entities
     */
    List<Lehrer> findAll();


    /**
     * Get the "id" lehrer.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Lehrer> findOne(Long id);

    /**
     * Delete the "id" lehrer.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
