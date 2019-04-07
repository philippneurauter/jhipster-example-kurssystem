package at.hakimst.kurssystemimst.service.impl;

import at.hakimst.kurssystemimst.service.KursService;
import at.hakimst.kurssystemimst.domain.Kurs;
import at.hakimst.kurssystemimst.repository.KursRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Kurs.
 */
@Service
@Transactional
public class KursServiceImpl implements KursService {

    private final Logger log = LoggerFactory.getLogger(KursServiceImpl.class);

    private final KursRepository kursRepository;

    public KursServiceImpl(KursRepository kursRepository) {
        this.kursRepository = kursRepository;
    }

    /**
     * Save a kurs.
     *
     * @param kurs the entity to save
     * @return the persisted entity
     */
    @Override
    public Kurs save(Kurs kurs) {
        log.debug("Request to save Kurs : {}", kurs);
        return kursRepository.save(kurs);
    }

    /**
     * Get all the kurs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Kurs> findAll(Pageable pageable) {
        log.debug("Request to get all Kurs");
        return kursRepository.findAll(pageable);
    }


    /**
     * Get one kurs by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Kurs> findOne(Long id) {
        log.debug("Request to get Kurs : {}", id);
        return kursRepository.findById(id);
    }

    /**
     * Delete the kurs by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Kurs : {}", id);
        kursRepository.deleteById(id);
    }
}
