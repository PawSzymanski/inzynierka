package com.dent.dao;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class VehicleDao {

    private EntityManager entityManager;

    public VehicleDao(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
}
