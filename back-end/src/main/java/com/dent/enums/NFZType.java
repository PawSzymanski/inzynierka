package com.dent.enums;

public enum NFZType {
    O("o"),
    K("k"),
    KAMIEN("~"),
    BRAK_ZEBA("-"),
    C("c"),
    W("w")
    ;

    private String name;

    NFZType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
