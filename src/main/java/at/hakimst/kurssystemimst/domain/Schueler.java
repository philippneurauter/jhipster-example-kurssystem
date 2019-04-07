package at.hakimst.kurssystemimst.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Schueler.
 */
@Entity
@Table(name = "schueler")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Schueler implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "schuelername", nullable = false)
    private String schuelername;

    @Column(name = "klasse")
    private String klasse;

    @Column(name = "geburtsdatum")
    private LocalDate geburtsdatum;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "schueler_kurs",
               joinColumns = @JoinColumn(name = "schueler_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "kurs_id", referencedColumnName = "id"))
    private Set<Kurs> kurs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSchuelername() {
        return schuelername;
    }

    public Schueler schuelername(String schuelername) {
        this.schuelername = schuelername;
        return this;
    }

    public void setSchuelername(String schuelername) {
        this.schuelername = schuelername;
    }

    public String getKlasse() {
        return klasse;
    }

    public Schueler klasse(String klasse) {
        this.klasse = klasse;
        return this;
    }

    public void setKlasse(String klasse) {
        this.klasse = klasse;
    }

    public LocalDate getGeburtsdatum() {
        return geburtsdatum;
    }

    public Schueler geburtsdatum(LocalDate geburtsdatum) {
        this.geburtsdatum = geburtsdatum;
        return this;
    }

    public void setGeburtsdatum(LocalDate geburtsdatum) {
        this.geburtsdatum = geburtsdatum;
    }

    public Set<Kurs> getKurs() {
        return kurs;
    }

    public Schueler kurs(Set<Kurs> kurs) {
        this.kurs = kurs;
        return this;
    }

    public Schueler addKurs(Kurs kurs) {
        this.kurs.add(kurs);
        kurs.getKursnames().add(this);
        return this;
    }

    public Schueler removeKurs(Kurs kurs) {
        this.kurs.remove(kurs);
        kurs.getKursnames().remove(this);
        return this;
    }

    public void setKurs(Set<Kurs> kurs) {
        this.kurs = kurs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Schueler schueler = (Schueler) o;
        if (schueler.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), schueler.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Schueler{" +
            "id=" + getId() +
            ", schuelername='" + getSchuelername() + "'" +
            ", klasse='" + getKlasse() + "'" +
            ", geburtsdatum='" + getGeburtsdatum() + "'" +
            "}";
    }
}
