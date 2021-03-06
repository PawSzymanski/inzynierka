package com.dent.entities;


import com.dent.enums.TeethView;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
public class PhotoHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "photo_hist_sequence")
    @SequenceGenerator(name = "photo_hist_sequence", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private String base64;

    @Enumerated(EnumType.STRING)
    private TeethView teethView;

    @JsonIgnore
    @ManyToOne
    private Visit visit;
}
