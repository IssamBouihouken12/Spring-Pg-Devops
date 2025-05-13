package com.cart.ecom_proj.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DimDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer dateId;

    private String dateComplete;

    private Integer annee;

    private Integer mois;
    private String nomMois;

    private Integer trimestre;
    private Boolean isWeekend;  // true si c'est un week-end


    private String jourSemaine;

    public Boolean getWeekend() {
        return isWeekend;
    }

    public void setWeekend(Boolean weekend) {
        isWeekend = weekend;
    }

    //getters and setters
    public Integer getAnnee() {
        return annee;
    }

    public void setAnnee(Integer annee) {
        this.annee = annee;
    }

    public String getDateComplete() {
        return dateComplete;
    }

    public void setDateComplete(String dateComplete) {
        this.dateComplete = dateComplete;
    }

    public Integer getDateId() {
        return dateId;
    }

    public void setDateId(Integer dateId) {
        this.dateId = dateId;
    }

    public String getJourSemaine() {
        return jourSemaine;
    }

    public void setJourSemaine(String jourSemaine) {
        this.jourSemaine = jourSemaine;
    }

    public Integer getMois() {
        return mois;
    }

    public void setMois(Integer mois) {
        this.mois = mois;
    }

    public String getNomMois() {
        return nomMois;
    }

    public void setNomMois(String nomMois) {
        this.nomMois = nomMois;
    }

    public Integer getTrimestre() {
        return trimestre;
    }

    public void setTrimestre(Integer trimestre) {
        this.trimestre = trimestre;
    }


}
