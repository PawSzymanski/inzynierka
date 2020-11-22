package com.dent.models;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class ReceiptModel {

    private String name;

    private String amount;

    private LocalDate date;

    private Long patient_id;
}
