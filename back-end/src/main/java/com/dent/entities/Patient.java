package com.dent.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Setter
@Getter
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "patient_sequence")
    @SequenceGenerator(name = "patient_sequence", allocationSize = 1)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private String login;

    @JsonIgnore
    private String password;

    private String name;

    private String surname;

    private String pesel;

    private LocalDate birthday;

    private String email;

    private String phone;

    private Boolean isBlocked;

//    @JsonIgnore
//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "kli_na_zni",
//            joinColumns = { @JoinColumn(name = "kli_klient") },
//            inverseJoinColumns = { @JoinColumn(name = "zni_znizka") }
//    )
//    private List<DiscountEntity> discounts;
//
//    @ManyToOne(fetch = FetchType.EAGER)
//   /* @JoinTable(
//            name = "kli_na_rol",
//            joinColumns = { @JoinColumn(name = "kli_klient") },
//            inverseJoinColumns = { @JoinColumn(name = "rol_role") }
//    )*/
//    private RoleEntity role;
//
//    @JsonIgnore
//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "nag_na_kli",
//            joinColumns = { @JoinColumn(name = "kli_klient") },
//            inverseJoinColumns = { @JoinColumn(name = "zni_nagroda") }
//    )
//    private List<LoyalitySystemEntity> rewards;
}
