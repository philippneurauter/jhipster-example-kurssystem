package at.hakimst.kurssystemimst.repository;

import at.hakimst.kurssystemimst.domain.Schueler;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Schueler entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SchuelerRepository extends JpaRepository<Schueler, Long> {

    @Query(value = "select distinct schueler from Schueler schueler left join fetch schueler.kurs",
        countQuery = "select count(distinct schueler) from Schueler schueler")
    Page<Schueler> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct schueler from Schueler schueler left join fetch schueler.kurs")
    List<Schueler> findAllWithEagerRelationships();

    @Query("select schueler from Schueler schueler left join fetch schueler.kurs where schueler.id =:id")
    Optional<Schueler> findOneWithEagerRelationships(@Param("id") Long id);

}
