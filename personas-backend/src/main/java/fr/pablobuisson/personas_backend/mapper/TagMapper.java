package fr.pablobuisson.personas_backend.mapper;

import fr.pablobuisson.personas_backend.dto.TagDto;
import fr.pablobuisson.personas_backend.model.Tag;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface TagMapper {
    TagMapper INSTANCE = Mappers.getMapper( TagMapper.class );

    Tag toEntity(TagDto tagDto);

    TagDto toDto(Tag tag);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Tag partialUpdate(TagDto tagDto, @MappingTarget Tag tag);
}
