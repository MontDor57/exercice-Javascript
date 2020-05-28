<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Client
 * @ApiResource()
 *
 * @ORM\Table(name="client", indexes={@ORM\Index(name="villeCli", columns={"villeCli"})})
 * @ORM\Entity
 */
class Client
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @Groups({"read:commande"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="nomCli", type="string", length=60, nullable=false)
     * @Groups({"read:commande"})
     */
    private $nomcli;

    /**
     * @var string
     *
     * @ORM\Column(name="adrCli", type="string", length=50, nullable=false)
     */
    private $adrcli;

    /**
     * @var string|null
     *
     * @ORM\Column(name="villeCli", type="string", length=6, nullable=true)
     */
    private $villecli;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomcli(): ?string
    {
        return $this->nomcli;
    }

    public function setNomcli(string $nomcli): self
    {
        $this->nomcli = $nomcli;

        return $this;
    }

    public function getAdrcli(): ?string
    {
        return $this->adrcli;
    }

    public function setAdrcli(string $adrcli): self
    {
        $this->adrcli = $adrcli;

        return $this;
    }

    public function getVillecli(): ?string
    {
        return $this->villecli;
    }

    public function setVillecli(?string $villecli): self
    {
        $this->villecli = $villecli;

        return $this;
    }


}
