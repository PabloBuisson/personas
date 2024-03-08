package fr.pablobuisson.personas.personas.mapper;

import fr.pablobuisson.personas.personas.dto.TagDto;
import fr.pablobuisson.personas.personas.model.Tag;
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
