package com.cart.ecom_proj.controller;

import com.cart.ecom_proj.model.DimDate;
import com.cart.ecom_proj.service.DimDateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dates")
public class DimDateController {

    @Autowired
    private DimDateService dimDateService;

    @PostMapping
    public DimDate createDate(@RequestBody DimDate dimDate) {
        return dimDateService.addDimDate(dimDate);
    }

    @GetMapping
    public List<DimDate> getAllDates() {
        return dimDateService.getAllDates();
    }

    @GetMapping("/{dateId}")
    public Optional<DimDate> getDateById(@PathVariable int dateId) {
        return Optional.ofNullable(dimDateService.getDateById(dateId));
    }

    @DeleteMapping("/{dateId}")
    public void deleteDate(@PathVariable Integer dateId) {
        dimDateService.deleteDimDate(dateId);
    }
}
