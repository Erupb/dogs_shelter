package com.example.course_work;

import java.util.List;

public interface Driver<T> {

    void create(T t);

    List<T> readAll();

    T read(long id);

    boolean update(T t, long id);

    boolean delete(long id);
}