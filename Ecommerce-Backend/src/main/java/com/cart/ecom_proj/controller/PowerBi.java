package com.cart.ecom_proj.controller;



import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/powerbi")
@CrossOrigin(origins = "*") // ou configure selon ton origine React
public class PowerBi {

    @GetMapping("/config")
    public ResponseEntity<Map<String, String>> getPowerBIConfig() {
        // ⚠️ Ces valeurs doivent être générées dynamiquement plus tard via Azure AD
        String accessToken = "TON_ACCESS_TOKEN";
        String embedUrl = "TON_EMBED_URL";
        String reportId = "TON_REPORT_ID";

        Map<String, String> config = new HashMap<>();
        config.put("accessToken", accessToken);
        config.put("embedUrl", embedUrl);
        config.put("reportId", reportId);

        return ResponseEntity.ok(config);
    }
}
