package com.dent.controllers;

import com.dent.entities.Calendar;
import com.dent.jpa.CalendarJpa;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendars")
public class CalendarController {

    private CalendarJpa calendarJpa;

    public CalendarController(CalendarJpa calendarJpa) {
        this.calendarJpa = calendarJpa;
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

        calendarJpa.save(calendar);
        return ResponseEntity.ok(true);
    }

    @GetMapping("")
    public ResponseEntity<List<Calendar>> get() {
        return ResponseEntity.ok(calendarJpa.findAll());
    }
}
