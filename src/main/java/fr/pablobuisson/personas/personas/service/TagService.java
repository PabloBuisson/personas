package fr.pablobuisson.personas.personas.service;

import fr.pablobuisson.personas.personas.dto.TagDto;
import fr.pablobuisson.personas.personas.mapper.ProjectMapper;
import fr.pablobuisson.personas.personas.mapper.TagMapper;
import fr.pablobuisson.personas.personas.model.Persona;
import fr.pablobuisson.personas.personas.model.Tag;
import fr.pablobuisson.personas.personas.repository.TagRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Data
public class TagService {
    private final TagRepository tagRepository;
    private final TagMapper tagMapper;

    public List<TagDto> getAll() {
        return this.tagRepository.findAll().stream().map(this.tagMapper::toDto).toList();
    }

    public TagDto getById(Long id) {
        return this.tagMapper.toDto(this.tagRepository.findById(id).orElse(null));
    }

    public List<TagDto> getByProjectId(Long id) {
        return this.tagRepository.findTagsByProjectsId(id).stream().map(this.tagMapper::toDto).toList();
    }

    public TagDto create(TagDto tagDto) {
        Tag tagToCreate = this.tagMapper.toEntity(tagDto);
        Tag tagSaved = this.tagRepository.save(tagToCreate);
        return this.tagMapper.toDto(tagSaved);
    }

    public void delete(Long id) {
        this.tagRepository.deleteById(id);
    }

    public TagDto update(TagDto tagDto, Long id) {
        Tag tag = this.tagMapper.toEntity(tagDto);
        // Security to make sure that the id in the url
        // is the same as the entity that we are about to change
        // and to prevent undesired creation (entity without id leads to a creation of an entity)
        tag.setId(id);
        Tag savedTag = this.tagRepository.save(tag);
        return this.tagMapper.toDto(savedTag);
    }

    public boolean existsInDB(Long id) {
        return this.tagRepository.existsById(id);
    }
}
