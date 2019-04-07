package at.hakimst.kurssystemimst.service;

import at.hakimst.kurssystemimst.domain.Kurs;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Kurs.
 */
public interface KursService {

    /**
     * Save a kurs.
     *
     * @param kurs the entity to save
     * @return the persisted entity
     */
    Kurs save(Kurs kurs);

    /**
     * Get all the kurs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Kurs> findAll(Pageable pageable);


    /**
     * Get the "id" kurs.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Kurs> findOne(Long id);

    /**
     * Delete the "id" kurs.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
