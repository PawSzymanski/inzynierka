package com.dent.entities;
;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Setter
@Getter
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "visit_sequence")
    @SequenceGenerator(name = "visit_sequence", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private LocalDate date;

    @OneToMany
    @JoinColumn(name = "visit_id")
    private List<PhotoHistory> histories;

    @ManyToOne
    private Patient patient;
}
