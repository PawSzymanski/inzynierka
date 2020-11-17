package com.dent.entities;

import com.dent.enums.TeethView;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
public class PhotoIndicator {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "photo_idicat_sequence")
    @SequenceGenerator(name = "photo_idicat_sequence", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private String message;

    private Float x;

    private Float y;

    @Enumerated(EnumType.STRING)
    private TeethView teethView;

    private String RTGBase64;

    @ManyToOne
    private Visit visit;
}
