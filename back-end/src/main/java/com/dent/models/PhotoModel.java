package com.dent.models;

import com.dent.enums.TeethView;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PhotoModel {
    private TeethView teethView;

    private Long visit_id;

    private String base64;
}
