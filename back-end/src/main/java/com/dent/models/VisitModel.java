package com.dent.models;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class VisitModel {

    private LocalDate date;

    private Long patient_id;
}
