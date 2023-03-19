package com.example.course_work;

import com.example.course_work.auth.User;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Generated;
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
    private int id;

    @OneToOne(fetch = FetchType.LAZY)
    private User user_id;

    @OneToOne(fetch = FetchType.LAZY)
    private User dog_id;
}
