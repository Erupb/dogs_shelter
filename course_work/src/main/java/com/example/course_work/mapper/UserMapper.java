package com.example.course_work.mapper;

import org.mapstruct.*;
import org.springframework.stereotype.Component;
import com.example.course_work.dto.GetUserDTO;
import com.example.course_work.dto.UpdateUserDTO;
import com.example.course_work.model.User;

import java.util.Collection;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = "spring")
public interface UserMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromDto(UpdateUserDTO dto, @MappingTarget User entity);
/*

    @Mapping(target = "registrationDate", source = "user.registrationDate")
    @Mapping(target = "posts", source = "postDTOCollection")
    GetUserDTO toUserDto(User user, Collection<ShortPostDTO> postDTOCollection);
*/

    /*@Mapping(target = "registrationDate", source = "user.registrationDate")
    List<GetUserDTO> toUserDto(Collection<User> users, PostMapper mapper);*/
}
