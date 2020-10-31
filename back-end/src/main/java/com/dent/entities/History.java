package com.dent.entities;

import com.dent.enums.NFZType;
import com.dent.models.HistoryBody;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "patient_sequence")
    @SequenceGenerator(name = "patient_sequence", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @Enumerated(value=EnumType.STRING)
    private NFZType type;

    private Float x;

    private Float y;

    @ManyToOne(fetch = FetchType.LAZY)
    private Patient patient;

    public static History of(HistoryBody body) {
        History history = new History();
        history.setType(NFZType.valueOf(body.getType().toUpperCase()));
        history.setX(body.getX());
        history.setY(body.getY());
        return history;
    }
}
