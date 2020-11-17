package com.dent.controllers;

import com.dent.entities.History;
import com.dent.entities.PhotoHistory;
import com.dent.entities.PhotoIndicator;
import com.dent.entities.Visit;
import com.dent.enums.TeethView;
import com.dent.jpa.*;
import com.dent.models.HistoryBody;
import com.dent.models.IndicatorModel;
import com.dent.models.PhotoModel;
import com.dent.models.VisitModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    private HistoryJpa historyJpa;

    private PatientJpa patientJpa;

    private VisitJpa visitJpa;

    private PhotoIndicatorJpa photoIndicatorJpa;

    private PhotoHistoryJpa photoHistoryJpa;

    public PatientController(HistoryJpa historyJpa, PatientJpa patientJpa, VisitJpa visitJpa,
                             PhotoIndicatorJpa photoIndicatorJpa, PhotoHistoryJpa photoHistoryJpa) {
        this.historyJpa = historyJpa;
        this.patientJpa = patientJpa;
        this.visitJpa = visitJpa;
        this.photoIndicatorJpa = photoIndicatorJpa;
        this.photoHistoryJpa = photoHistoryJpa;
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
        photoIndicator.setRTGBase64(model.getRTGBase64());
        photoIndicatorJpa.save(photoIndicator);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/addPhotoToVisit")
    public ResponseEntity<Boolean> addPhotoToVisit(@RequestBody PhotoModel model) {
        PhotoHistory ph = new PhotoHistory();
        ph.setBase64(model.getBase64());
        ph.setVisit(visitJpa.findById(model.getVisit_id()).get());
        ph.setTeethView(model.getTeethView());
        photoHistoryJpa.save(ph);
        return ResponseEntity.ok(true);
    }

    @GetMapping("/getPhoto")
    public ResponseEntity<PhotoHistory> getPhotoToVisit(@RequestParam Long visitId,
                                                        @RequestParam TeethView teethView) {
        return ResponseEntity.ok(photoHistoryJpa.findByVisit_IdAndTeethView(visitId, teethView));
    }
}
