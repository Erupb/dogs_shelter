package com.example.course_work.model;

import com.example.course_work.Jsonable;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="dogs")
@Data
@NoArgsConstructor
@Getter
@Setter
@Builder
@AllArgsConstructor
public class Dog implements Jsonable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "breed")
    private String breed;

    @Column(name = "gender")
    private String gender;

    // Ссылка на картинку
    @Column(name = "img")
    private String img;

    @Column(name = "age")
    private int age;

    @Column(name = "description")
    private String description;

    @Column(name = "ordered")
    private boolean ordered;
}
