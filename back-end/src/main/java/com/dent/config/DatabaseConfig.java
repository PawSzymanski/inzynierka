package com.dent.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

//@Configuration
//@EnableJpaRepositories
public class DatabaseConfig {

  //  @Bean
 //   LocalContainerEntityManagerFactoryBean entityManagerFactory() {
//        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
//        em.setDataSource(dataSourcenotDefault());
//        em.setPackagesToScan(notDefaultRepository.class.getPackage().getName(), notDefaultBi.class.getPackage().getName());
//        em.setPersistenceUnitName("notDefaultDb");

//        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
//        vendorAdapter.setGenerateDdl(false);
//        em.setJpaVendorAdapter(vendorAdapter);
//        return em;
 //   }
}
