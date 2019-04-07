package at.hakimst.kurssystemimst.repository;

import at.hakimst.kurssystemimst.domain.Lehrer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Lehrer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LehrerRepository extends JpaRepository<Lehrer, Long> {

}
