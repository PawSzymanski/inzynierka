package com.dent.controllers;

import com.dent.entities.History;
import com.dent.jpa.HistoryJpa;
import com.dent.jpa.PatientJpa;
import com.dent.models.HistoryBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    private HistoryJpa historyJpa;

    private PatientJpa patientJpa;

    public PatientController(HistoryJpa historyJpa, PatientJpa patientJpa) {
        this.historyJpa = historyJpa;
        this.patientJpa = patientJpa;
    }


    @PostMapping("/history")
    public ResponseEntity<Boolean> history(@RequestBody HistoryBody history) {
        History hist = History.of(history);
        hist.setPatient(patientJpa.findById(history.getPatient_id()).get());
        historyJpa.save(hist);
        return ResponseEntity.ok(true);
    }
}
