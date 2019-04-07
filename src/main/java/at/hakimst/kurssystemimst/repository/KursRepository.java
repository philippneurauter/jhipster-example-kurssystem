package at.hakimst.kurssystemimst.repository;

import at.hakimst.kurssystemimst.domain.Kurs;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Kurs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KursRepository extends JpaRepository<Kurs, Long> {

}
