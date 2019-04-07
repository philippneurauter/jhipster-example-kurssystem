package at.hakimst.kurssystemimst.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Kurs.
 */
@Entity
@Table(name = "kurs")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Kurs implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "kursname", nullable = false)
    private String kursname;

    @NotNull
    @Column(name = "kursart", nullable = false)
    private String kursart;

    @Column(name = "kurseinheit")
    private Double kurseinheit;

    @Column(name = "kurskapazitaet")
    private String kurskapazitaet;

    @ManyToOne
    @JsonIgnoreProperties("lehrernames")
    private Lehrer lehrer;

    @ManyToMany(mappedBy = "kurs")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Schueler> kursnames = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKursname() {
        return kursname;
    }

    public Kurs kursname(String kursname) {
        this.kursname = kursname;
        return this;
    }

    public void setKursname(String kursname) {
        this.kursname = kursname;
    }

    public String getKursart() {
        return kursart;
    }

    public Kurs kursart(String kursart) {
        this.kursart = kursart;
        return this;
    }

    public void setKursart(String kursart) {
        this.kursart = kursart;
    }

    public Double getKurseinheit() {
        return kurseinheit;
    }

    public Kurs kurseinheit(Double kurseinheit) {
        this.kurseinheit = kurseinheit;
        return this;
    }

    public void setKurseinheit(Double kurseinheit) {
        this.kurseinheit = kurseinheit;
    }

    public String getKurskapazitaet() {
        return kurskapazitaet;
    }

    public Kurs kurskapazitaet(String kurskapazitaet) {
        this.kurskapazitaet = kurskapazitaet;
        return this;
    }

    public void setKurskapazitaet(String kurskapazitaet) {
        this.kurskapazitaet = kurskapazitaet;
    }

    public Lehrer getLehrer() {
        return lehrer;
    }

    public Kurs lehrer(Lehrer lehrer) {
        this.lehrer = lehrer;
        return this;
    }

    public void setLehrer(Lehrer lehrer) {
        this.lehrer = lehrer;
    }

    public Set<Schueler> getKursnames() {
        return kursnames;
    }

    public Kurs kursnames(Set<Schueler> schuelers) {
        this.kursnames = schuelers;
        return this;
    }

    public Kurs addKursname(Schueler schueler) {
        this.kursnames.add(schueler);
        schueler.getKurs().add(this);
        return this;
    }

    public Kurs removeKursname(Schueler schueler) {
        this.kursnames.remove(schueler);
        schueler.getKurs().remove(this);
        return this;
    }

    public void setKursnames(Set<Schueler> schuelers) {
        this.kursnames = schuelers;
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
        Kurs kurs = (Kurs) o;
        if (kurs.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), kurs.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Kurs{" +
            "id=" + getId() +
            ", kursname='" + getKursname() + "'" +
            ", kursart='" + getKursart() + "'" +
            ", kurseinheit=" + getKurseinheit() +
            ", kurskapazitaet='" + getKurskapazitaet() + "'" +
            "}";
    }
}
