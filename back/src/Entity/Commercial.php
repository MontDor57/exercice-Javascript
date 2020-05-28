<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * Commercial
 *
 * @ORM\Table(name="commercial")
 * @ORM\Entity
 */
class Commercial
{
    /**
     * @var int
     *
     * @ORM\Column(name="num_com", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $numCom;

    /**
     * @var string
     *
     * @ORM\Column(name="nom_commercial", type="string", length=50, nullable=false)
     */
    private $nomCommercial;

    /**
     * @var string
     *
     * @ORM\Column(name="prenom_commercial", type="string", length=50, nullable=false)
     */
    private $prenomCommercial;

    public function getNumCom(): ?int
    {
        return $this->numCom;
    }

    public function getNomCommercial(): ?string
    {
        return $this->nomCommercial;
    }

    public function setNomCommercial(string $nomCommercial): self
    {
        $this->nomCommercial = $nomCommercial;

        return $this;
    }

    public function getPrenomCommercial(): ?string
    {
        return $this->prenomCommercial;
    }

    public function setPrenomCommercial(string $prenomCommercial): self
    {
        $this->prenomCommercial = $prenomCommercial;

        return $this;
    }


}
