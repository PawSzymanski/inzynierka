package com.dent.controllers;

import com.dent.entities.History;
import com.dent.entities.PhotoIndicator;
import com.dent.entities.Visit;
import com.dent.jpa.HistoryJpa;
import com.dent.jpa.PatientJpa;
import com.dent.jpa.PhotoIndicatorJpa;
import com.dent.jpa.VisitJpa;
import com.dent.models.HistoryBody;
import com.dent.models.IndicatorModel;
import com.dent.models.VisitModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    private HistoryJpa historyJpa;

    private PatientJpa patientJpa;

    private VisitJpa visitJpa;

    private PhotoIndicatorJpa photoIndicatorJpa;

    public PatientController(HistoryJpa historyJpa, PatientJpa patientJpa,
                             VisitJpa visitJpa, PhotoIndicatorJpa photoIndicatorJpa) {
        this.historyJpa = historyJpa;
        this.patientJpa = patientJpa;
        this.visitJpa = visitJpa;
        this.photoIndicatorJpa = photoIndicatorJpa;
    }

    @PostMapping("/history")
    public ResponseEntity<Boolean> history(@RequestBody HistoryBody history) {
        History hist = History.of(history);
        hist.setPatient(patientJpa.findById(history.getPatient_id()).get());
        historyJpa.save(hist);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/addVisit")
    public ResponseEntity<Boolean> addVisit(@RequestBody VisitModel model) {
        Visit visit = new Visit();
        visit.setDate(model.getDate());
        visit.setPatient(patientJpa.findById(model.getPatient_id()).get());
        visitJpa.save(visit);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/addIndicatorToVisit")
    public ResponseEntity<Boolean> addIndicatorToVisit(@RequestBody IndicatorModel model) {
        PhotoIndicator photoIndicator = new PhotoIndicator();
        photoIndicator.setMessage(model.getMessage());
        photoIndicator.setX(model.getX());
        photoIndicator.setY(model.getY());
        photoIndicator.setVisit(visitJpa.findById(model.getVisit_id()).get());
        photoIndicator.setTeethView(model.getTeethView());
        photoIndicatorJpa.save(photoIndicator);
        return ResponseEntity.ok(true);
    }
}
