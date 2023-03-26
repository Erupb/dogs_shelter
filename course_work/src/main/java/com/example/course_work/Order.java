package com.example.course_work;

import com.example.course_work.auth.User;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "orders")
@Getter
@Setter
@JsonSerialize
@NoArgsConstructor
public class Order implements Jsonable{
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "user_id")
    @Column(name = "user_id")
    private Long user_id;

    @JoinColumn(name = "dog_id")
    @Column(name = "dog_id")
    private int dog_id;

}
