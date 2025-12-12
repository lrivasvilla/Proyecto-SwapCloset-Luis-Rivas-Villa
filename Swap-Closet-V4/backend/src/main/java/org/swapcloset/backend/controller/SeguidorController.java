package org.swapcloset.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.swapcloset.backend.dto.UsuarioDTO;
import org.swapcloset.backend.service.SeguidorService;

import java.util.List;

@RestController
@RequestMapping("/api/seguidores")
@CrossOrigin(origins = "http://localhost:8100")
public class SeguidorController {

    private final SeguidorService seguidorService;

    public SeguidorController(SeguidorService seguidorService) {
        this.seguidorService = seguidorService;
    }

    @GetMapping("/usuario/{idUsuario}/count")
    public ResponseEntity<Integer> getCountSeguidoresByUsuario(@PathVariable Integer idUsuario) {
        Integer count = seguidorService.getTotalSeguidores(idUsuario);
        return ResponseEntity.ok(count);
    }
    @GetMapping("/usuario/{idUsuario}/seguidores")
    public ResponseEntity<List<UsuarioDTO>> getSeguidoresByUsuario(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(seguidorService.findSeguidoresByUsuarioId(idUsuario));
    }

    @GetMapping("/usuario/{idUsuario}/seguidos")
    public ResponseEntity<List<UsuarioDTO>> getSeguidosByUsuario(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(seguidorService.findSeguidosByUsuarioId(idUsuario));
    }

}