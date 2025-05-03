package com.cart.ecom_proj.service;

import com.cart.ecom_proj.model.DimDate;
import com.cart.ecom_proj.repo.DimDateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DimDateService {

    @Autowired
    private DimDateRepo dimDateRepo;

    // Récupérer toutes les dates
    public List<DimDate> getAllDates() {
        return dimDateRepo.findAll();
    }

    // Récupérer une date par ID
    public DimDate getDateById(int dateId) {
        return dimDateRepo.findById(dateId)
                .orElseThrow(() -> new RuntimeException("Date non trouvée"));
    }


    public DimDate addDimDate(DimDate dimDate) {
        return dimDateRepo.save(dimDate);
    }


    public DimDate updateDimDate(Integer dateId, DimDate dimDateDetails) {
        DimDate dimDate = getDateById(dateId);
        dimDate.setDateComplete(dimDateDetails.getDateComplete());
        dimDate.setAnnee(dimDateDetails.getAnnee());
        dimDate.setMois(dimDateDetails.getMois());
        dimDate.setNomMois(dimDateDetails.getNomMois());
        dimDate.setTrimestre(dimDateDetails.getTrimestre());
        dimDate.setJourSemaine(dimDateDetails.getJourSemaine());
        return dimDateRepo.save(dimDate);
    }

    // Supprimer une date
    public void deleteDimDate(Integer dateId) {
        DimDate dimDate = getDateById(dateId);
        dimDateRepo.delete(dimDate);
    }
}
