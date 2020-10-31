package com.dent.models;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class HistoryBody {
    private String type;

    private Float x;

    private Float y;

    private Long patient_id;

}
