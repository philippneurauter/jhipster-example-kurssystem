package at.hakimst.kurssystemimst.service.impl;

import at.hakimst.kurssystemimst.service.LehrerService;
import at.hakimst.kurssystemimst.domain.Lehrer;
import at.hakimst.kurssystemimst.repository.LehrerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Lehrer.
 */
@Service
@Transactional
public class LehrerServiceImpl implements LehrerService {

    private final Logger log = LoggerFactory.getLogger(LehrerServiceImpl.class);

    private final LehrerRepository lehrerRepository;

    public LehrerServiceImpl(LehrerRepository lehrerRepository) {
        this.lehrerRepository = lehrerRepository;
    }

    /**
     * Save a lehrer.
     *
     * @param lehrer the entity to save
     * @return the persisted entity
     */
    @Override
    public Lehrer save(Lehrer lehrer) {
        log.debug("Request to save Lehrer : {}", lehrer);
        return lehrerRepository.save(lehrer);
    }

    /**
     * Get all the lehrers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Lehrer> findAll() {
        log.debug("Request to get all Lehrers");
        return lehrerRepository.findAll();
    }


    /**
     * Get one lehrer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Lehrer> findOne(Long id) {
        log.debug("Request to get Lehrer : {}", id);
        return lehrerRepository.findById(id);
    }

    /**
     * Delete the lehrer by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Lehrer : {}", id);
        lehrerRepository.deleteById(id);
    }
}
