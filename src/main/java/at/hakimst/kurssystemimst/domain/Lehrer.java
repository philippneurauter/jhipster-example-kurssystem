package at.hakimst.kurssystemimst.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
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
 * A Lehrer.
 */
@Entity
@Table(name = "lehrer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Lehrer implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "lehrername", nullable = false)
    private String lehrername;

    @Column(name = "geburtsdatum")
    private LocalDate geburtsdatum;

    @Column(name = "faecher")
    private String faecher;

    @Column(name = "vorstand")
    private String vorstand;

    @OneToMany(mappedBy = "lehrer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Kurs> lehrernames = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLehrername() {
        return lehrername;
    }

    public Lehrer lehrername(String lehrername) {
        this.lehrername = lehrername;
        return this;
    }

    public void setLehrername(String lehrername) {
        this.lehrername = lehrername;
    }

    public LocalDate getGeburtsdatum() {
        return geburtsdatum;
    }

    public Lehrer geburtsdatum(LocalDate geburtsdatum) {
        this.geburtsdatum = geburtsdatum;
        return this;
    }

    public void setGeburtsdatum(LocalDate geburtsdatum) {
        this.geburtsdatum = geburtsdatum;
    }

    public String getFaecher() {
        return faecher;
    }

    public Lehrer faecher(String faecher) {
        this.faecher = faecher;
        return this;
    }

    public void setFaecher(String faecher) {
        this.faecher = faecher;
    }

    public String getVorstand() {
        return vorstand;
    }

    public Lehrer vorstand(String vorstand) {
        this.vorstand = vorstand;
        return this;
    }

    public void setVorstand(String vorstand) {
        this.vorstand = vorstand;
    }

    public Set<Kurs> getLehrernames() {
        return lehrernames;
    }

    public Lehrer lehrernames(Set<Kurs> kurs) {
        this.lehrernames = kurs;
        return this;
    }

    public Lehrer addLehrername(Kurs kurs) {
        this.lehrernames.add(kurs);
        kurs.setLehrer(this);
        return this;
    }

    public Lehrer removeLehrername(Kurs kurs) {
        this.lehrernames.remove(kurs);
        kurs.setLehrer(null);
        return this;
    }

    public void setLehrernames(Set<Kurs> kurs) {
        this.lehrernames = kurs;
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
        Lehrer lehrer = (Lehrer) o;
        if (lehrer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lehrer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Lehrer{" +
            "id=" + getId() +
            ", lehrername='" + getLehrername() + "'" +
            ", geburtsdatum='" + getGeburtsdatum() + "'" +
            ", faecher='" + getFaecher() + "'" +
            ", vorstand='" + getVorstand() + "'" +
            "}";
    }
}
