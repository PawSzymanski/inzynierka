package com.dent.models;

import com.dent.enums.TeethView;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class IndicatorModel {

    private TeethView teethView;

    private Float x;

    private Float y;

    private Long visit_id;

    private String message;
}
