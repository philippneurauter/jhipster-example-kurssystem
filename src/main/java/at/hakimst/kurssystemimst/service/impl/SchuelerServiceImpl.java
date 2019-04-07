package at.hakimst.kurssystemimst.service.impl;

import at.hakimst.kurssystemimst.service.SchuelerService;
import at.hakimst.kurssystemimst.domain.Schueler;
import at.hakimst.kurssystemimst.repository.SchuelerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Schueler.
 */
@Service
@Transactional
public class SchuelerServiceImpl implements SchuelerService {

    private final Logger log = LoggerFactory.getLogger(SchuelerServiceImpl.class);

    private final SchuelerRepository schuelerRepository;

    public SchuelerServiceImpl(SchuelerRepository schuelerRepository) {
        this.schuelerRepository = schuelerRepository;
    }

    /**
     * Save a schueler.
     *
     * @param schueler the entity to save
     * @return the persisted entity
     */
    @Override
    public Schueler save(Schueler schueler) {
        log.debug("Request to save Schueler : {}", schueler);
        return schuelerRepository.save(schueler);
    }

    /**
     * Get all the schuelers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Schueler> findAll() {
        log.debug("Request to get all Schuelers");
        return schuelerRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the Schueler with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<Schueler> findAllWithEagerRelationships(Pageable pageable) {
        return schuelerRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one schueler by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Schueler> findOne(Long id) {
        log.debug("Request to get Schueler : {}", id);
        return schuelerRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the schueler by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Schueler : {}", id);
        schuelerRepository.deleteById(id);
    }
}
