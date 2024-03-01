package fr.pablobuisson.personas.personas.mapper;

import fr.pablobuisson.personas.personas.dto.TagDto;
import fr.pablobuisson.personas.personas.model.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface TagMapper {
    TagMapper INSTANCE = Mappers.getMapper( TagMapper.class );

    Tag toEntity(TagDto tagDto);

    TagDto toDto(Tag tag);
}
