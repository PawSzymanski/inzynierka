package com.dent.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "calendar_sequence")
    @SequenceGenerator(name = "calendar_sequence", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private String title;

    @Column(name="valueFrom")
    private LocalDateTime from;

    @Column(name="valueTo")
    private LocalDateTime to;

    private Long patientId;
}
