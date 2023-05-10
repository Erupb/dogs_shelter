package com.example.course_work.model;

import com.example.course_work.Jsonable;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="orders")
@Data
@NoArgsConstructor
@Getter
@Setter
@Builder
@AllArgsConstructor
public class Order implements Jsonable {
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
