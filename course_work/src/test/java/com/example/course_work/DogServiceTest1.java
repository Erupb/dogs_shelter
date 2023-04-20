package com.example.course_work;

import com.example.course_work.service.DogService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
class DogServiceTest1 {
    @Mock
    private DogRepository dogRepository;
    private DogService underTest;

    @BeforeEach
    public void setUp() {
        underTest = new DogService(dogRepository);
    }

    @Test
    void create() {
        // given
        Dog dog = new Dog();
        dog.setBreed("Basenji");
        dog.setName("Klif");

        // when
        underTest.create(dog);

        // then
        ArgumentCaptor<Dog> cardArgumentCaptor =
                ArgumentCaptor.forClass(Dog.class);

        Mockito.verify(dogRepository).save(cardArgumentCaptor.capture());

        Dog capturedCard = cardArgumentCaptor.getValue();
        Assertions.assertThat(capturedCard).isEqualTo(dog);
    }

    @Test
    void readAll() {
        // given
        Dog dog = new Dog();
        dog.setBreed("Basenji");
        dog.setName("Klif");

        Mockito.when(dogRepository.findAll()).thenReturn(List.of(dog));

        // when
        List<Dog> expected = underTest.readAll();

        // then
        Mockito.verify(dogRepository).findAll();
        Assertions.assertThat(expected).isNotNull();
        Assertions.assertThat(expected.size()).isEqualTo(1);
        Assertions.assertThat(expected.get(0).getBreed()).isEqualTo(dog.getBreed());
        Assertions.assertThat(expected.get(0).getName()).isEqualTo(dog.getName());
    }

    @Test
    void delete() {
        // given
        Dog dog = new Dog();
        dog.setBreed("Basenji");
        dog.setName("Klif");
        dog.setId(1L);

        // when
        underTest.delete(dog.getId());

        // then
        Mockito.verify(dogRepository).deleteById(dog.getId());
    }

    @Test
    void findCardsByNumber() {
        // given
        Dog dog = new Dog();
        dog.setBreed("Basenji");
        dog.setName("Klif");

        Mockito.when(dogRepository.findAllByBreed(dog.getBreed())).thenReturn(List.of(dog));

        // when
        List<Dog> existed = underTest.findDogsByBreed(dog.getBreed());

        // then
        Assertions.assertThat(existed).isNotNull();
        Assertions.assertThat(existed.size()).isEqualTo(1);
        Assertions.assertThat(existed.get(0).getBreed()).isEqualTo(dog.getBreed());
        Assertions.assertThat(existed.get(0).getName()).isEqualTo(dog.getName());
    }

    @Test
    void findCardsByCode() {
        // given
        Dog dog = new Dog();
        dog.setBreed("Basenji");
        dog.setName("Klif");

        Mockito.when(dogRepository.findAllByBreed(dog.getBreed())).thenReturn(List.of(dog));

        // when
        List<Dog> existed = underTest.findDogsByBreed(dog.getBreed());

        // then
        Assertions.assertThat(existed).isNotNull();
        Assertions.assertThat(existed.size()).isEqualTo(1);
        Assertions.assertThat(existed.get(0).getBreed()).isEqualTo(dog.getBreed());
        Assertions.assertThat(existed.get(0).getName()).isEqualTo(dog.getName());
    }
}
