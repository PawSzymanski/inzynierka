package com.dent.controllers;

import com.dent.entities.Calendar;
import com.dent.entities.Patient;
import com.dent.entities.Visit;
import com.dent.jpa.CalendarJpa;
import com.dent.jpa.PatientJpa;
import com.dent.jpa.VisitJpa;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/calendars")
public class CalendarController {

    private CalendarJpa calendarJpa;

    private VisitJpa visitJpa;

    private PatientJpa patientJpa;

    public CalendarController(CalendarJpa calendarJpa, VisitJpa visitJpa, PatientJpa patientJpa) {
        this.calendarJpa = calendarJpa;
        this.visitJpa = visitJpa;
        this.patientJpa = patientJpa;
    }

    @PostMapping("")
    public ResponseEntity<Boolean> add(@RequestBody Calendar calendar) {
        if (calendar.getFrom() == null || calendar.getTo() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        if (calendarJpa.existsByToIsBeforeAndFromIsAfter(calendar.getFrom(), calendar.getFrom())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        if (calendarJpa.existsByFrom(calendar.getFrom())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        if (calendar.getPatientId() != null) {
            Patient patient = patientJpa.findById(calendar.getPatientId()).get();
            Visit visit = new Visit();
            calendar.setTitle(patient.getName() + " " + patient.getSurname() + " "
                    + calendar.getTitle());
            visit.setPatient(patientJpa.findById(calendar.getPatientId()).get());
            visit.setDate(calendar.getFrom().toLocalDate());
            visitJpa.save(visit);
        }

        calendarJpa.save(calendar);
        return ResponseEntity.ok(true);
    }

    @GetMapping("")
    public ResponseEntity<List<Calendar>> get() {
        return ResponseEntity.ok(calendarJpa.findAll());
    }
}
